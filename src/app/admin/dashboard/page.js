"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./dashboard.module.css";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    replied: 0,
    archived: 0,
  });
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // In-memory client cache: { [key: string]: { contacts: Array, stats: Object } }
  const clientCache = useRef({});

  // 1. Fetch Contacts with Filter & Search (Supports silent background revalidation)
  const fetchContactsData = useCallback(
    async (status = statusFilter, query = searchQuery, options = { silent: false }) => {
      const safeQuery = query.trim().toLowerCase();
      const cacheKey = `${status}:${safeQuery}`;
      const hasCached = !!clientCache.current[cacheKey];

      if (!options.silent && !hasCached) {
        setIsRefreshing(true);
      } else {
        setIsSyncing(true);
      }

      try {
        const params = new URLSearchParams();
        if (status !== "all") {
          params.append("status", status);
        }
        if (query.trim()) {
          params.append("q", query.trim());
        }

        const res = await fetch(`/api/admin/contacts?${params.toString()}`);
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        if (data.success) {
          const freshContacts = data.contacts || [];
          const freshStats = data.stats || null;

          setContacts(freshContacts);
          if (freshStats) {
            setStats(freshStats);
          }

          // Cache current tab view
          clientCache.current[cacheKey] = {
            contacts: freshContacts,
            stats: freshStats || stats,
          };
        }
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      } finally {
        setIsRefreshing(false);
        setIsSyncing(false);
      }
    },
    [statusFilter, searchQuery, router, stats]
  );

  // 2. Initialize Authentication & Initial Data
  useEffect(() => {
    let isMounted = true;
    async function initDashboard() {
      try {
        const authRes = await fetch("/api/admin/auth/me");
        if (!authRes.ok) {
          router.replace("/admin/login");
          return;
        }
        const authData = await authRes.json();
        if (!isMounted) return;
        setAdmin(authData.admin);

        const contactsRes = await fetch("/api/admin/contacts");
        if (contactsRes.ok && isMounted) {
          const cData = await contactsRes.json();
          const loadedContacts = cData.contacts || [];
          const loadedStats = cData.stats || {
            total: loadedContacts.length,
            unread: loadedContacts.filter((c) => c.status === "unread").length,
            read: loadedContacts.filter((c) => c.status === "read").length,
            replied: loadedContacts.filter((c) => c.status === "replied").length,
            archived: loadedContacts.filter((c) => c.status === "archived").length,
          };

          setContacts(loadedContacts);
          setStats(loadedStats);

          // Seed in-memory client cache for all tabs for 0ms tab switching
          clientCache.current["all:"] = { contacts: loadedContacts, stats: loadedStats };
          clientCache.current["unread:"] = {
            contacts: loadedContacts.filter((c) => c.status === "unread"),
            stats: loadedStats,
          };
          clientCache.current["read:"] = {
            contacts: loadedContacts.filter((c) => c.status === "read"),
            stats: loadedStats,
          };
          clientCache.current["replied:"] = {
            contacts: loadedContacts.filter((c) => c.status === "replied"),
            stats: loadedStats,
          };
          clientCache.current["archived:"] = {
            contacts: loadedContacts.filter((c) => c.status === "archived"),
            stats: loadedStats,
          };
        }
      } catch {
        router.replace("/admin/login");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    initDashboard();
    return () => {
      isMounted = false;
    };
  }, [router]);

  // 3. Instant Tab Switching (0ms transition with background sync)
  const handleTabChange = (newTab) => {
    setStatusFilter(newTab);
    const safeQuery = searchQuery.trim().toLowerCase();
    const targetKey = `${newTab}:${safeQuery}`;

    // A. Check specific cached tab query
    if (clientCache.current[targetKey]) {
      const cached = clientCache.current[targetKey];
      setContacts(cached.contacts);
      if (cached.stats) setStats(cached.stats);
      fetchContactsData(newTab, searchQuery, { silent: true });
      return;
    }

    // B. If no query, derive tab from "all:" cache
    const allKey = `all:${safeQuery}`;
    if (clientCache.current[allKey]) {
      const allEntry = clientCache.current[allKey];
      const filtered =
        newTab === "all"
          ? allEntry.contacts
          : allEntry.contacts.filter((c) => c.status === newTab);

      setContacts(filtered);
      clientCache.current[targetKey] = {
        contacts: filtered,
        stats: allEntry.stats,
      };
      fetchContactsData(newTab, searchQuery, { silent: true });
      return;
    }

    // C. Cache miss: fetch with spinner
    fetchContactsData(newTab, searchQuery, { silent: false });
  };

  // 4. Optimistic Status Update (Instant UI & count update without page spinner)
  const handleStatusChange = async (id, newStatus) => {
    const target = contacts.find((c) => c._id === id);
    if (!target || target.status === newStatus) return;

    const oldStatus = target.status;
    const previousContacts = [...contacts];
    const previousStats = { ...stats };

    // A. Optimistic UI update for contacts list
    setContacts((prev) => {
      if (statusFilter !== "all" && newStatus !== statusFilter) {
        // Filter out if currently viewing a specific status tab (e.g. unread -> read)
        return prev.filter((c) => c._id !== id);
      }
      return prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c));
    });

    // B. Optimistic Stats update (badges update in 0ms)
    const updatedStats = {
      ...stats,
      [oldStatus]: Math.max(0, (stats[oldStatus] || 0) - 1),
      [newStatus]: (stats[newStatus] || 0) + 1,
    };
    setStats(updatedStats);

    // C. Update in-memory client cache across all tabs
    Object.keys(clientCache.current).forEach((key) => {
      const entry = clientCache.current[key];
      if (entry && Array.isArray(entry.contacts)) {
        if (key.startsWith(`${oldStatus}:`)) {
          entry.contacts = entry.contacts.filter((c) => c._id !== id);
        } else if (key.startsWith(`${newStatus}:`)) {
          const alreadyExists = entry.contacts.some((c) => c._id === id);
          if (!alreadyExists) {
            entry.contacts = [{ ...target, status: newStatus }, ...entry.contacts];
          }
        } else {
          entry.contacts = entry.contacts.map((c) =>
            c._id === id ? { ...c, status: newStatus } : c
          );
        }
        entry.stats = updatedStats;
      }
    });

    // D. Fire server update in background
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status on server.");
      }
    } catch (err) {
      console.error("Status update error, rolling back:", err);
      setContacts(previousContacts);
      setStats(previousStats);
    }
  };

  // 5. Optimistic Delete (Instant removal from UI without spinner)
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete inquiry from "${name}"?`)) {
      return;
    }

    const target = contacts.find((c) => c._id === id);
    const previousContacts = [...contacts];
    const previousStats = { ...stats };

    // A. Optimistic UI update
    setContacts((prev) => prev.filter((c) => c._id !== id));

    // B. Optimistic Stats update
    if (target) {
      const statusKey = target.status;
      const updatedStats = {
        ...stats,
        total: Math.max(0, stats.total - 1),
        [statusKey]: Math.max(0, (stats[statusKey] || 0) - 1),
      };
      setStats(updatedStats);

      // C. Remove from all cached entries
      Object.keys(clientCache.current).forEach((key) => {
        const entry = clientCache.current[key];
        if (entry && Array.isArray(entry.contacts)) {
          entry.contacts = entry.contacts.filter((c) => c._id !== id);
          entry.stats = updatedStats;
        }
      });
    }

    // D. Fire server delete in background
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete contact on server.");
      }
    } catch (err) {
      console.error("Delete error, rolling back:", err);
      setContacts(previousContacts);
      setStats(previousStats);
      alert("Failed to delete inquiry. Reverted changes.");
    }
  };

  // 5. Logout Handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading || !admin) {
    return (
      <div className={styles.loadingFullWrapper}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>VERIFYING SECURITY CLEARANCE...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboardWrapper}>
      {/* Top Navbar */}
      <header className={styles.topNavbar}>
        <div className={styles.navContainer}>
          <div className={styles.brandGroup}>
            <div className={styles.brandBadge}>
              <span className={styles.statusDot}></span>
              <span>ADMIN_TERMINAL</span>
            </div>
            <span className={styles.brandDivider}>{"//"}</span>
            <span className={styles.dashboardTitle}>
              TRANSMISSIONS LOG {isSyncing && "• SYNCING..."}
            </span>
          </div>

          <div className={styles.navActions}>
            {admin && (
              <span className={styles.adminUserBadge}>
                OPERATOR: {admin.email}
              </span>
            )}
            <Link href="/" className={styles.portfolioLink}>
              VIEW PORTFOLIO ↗
            </Link>
            <button
              onClick={handleLogout}
              className={styles.logoutBtn}
              title="Terminate session"
            >
              LOGOUT ⏻
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className={styles.mainContainer}>
        {/* Statistics Cards */}
        <section className={styles.statsGrid} aria-label="Transmission statistics">
          <div className={styles.statCard}>
            <span className={styles.statLabel}>TOTAL INQUIRIES</span>
            <span className={styles.statValue}>{stats.total}</span>
          </div>

          <div className={`${styles.statCard} ${styles.statCardAccent}`}>
            <span className={styles.statLabel}>UNREAD TRANSMISSIONS</span>
            <span className={`${styles.statValue} ${styles.statValueAccent}`}>
              {stats.unread}
            </span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>REPLIED</span>
            <span className={styles.statValue}>{stats.replied}</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>ARCHIVED</span>
            <span className={styles.statValue}>{stats.archived}</span>
          </div>
        </section>

        {/* Filter and Search Controls */}
        <div className={styles.controlsBar}>
          <div className={styles.filterTabs}>
            {["all", "unread", "read", "replied", "archived"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => handleTabChange(tab)}
                className={`${styles.tabBtn} ${
                  statusFilter === tab ? styles.tabBtnActive : ""
                }`}
              >
                {tab.toUpperCase()}
                {tab === "unread" && stats.unread > 0 && ` (${stats.unread})`}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchContactsData(statusFilter, searchQuery, { silent: false });
            }}
            className={styles.searchGroup}
          >
            <input
              type="text"
              placeholder="Search by name, email, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button
              type="submit"
              className={styles.refreshBtn}
              title="Search and refresh messages"
            >
              SEARCH ↻
            </button>
          </form>
        </div>

        {/* Inquiries Content */}
        {isRefreshing ? (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>DECRYPTING TRANSMISSIONS...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>NO TRANSMISSIONS FOUND</h3>
            <p className={styles.emptyText}>
              {searchQuery
                ? `No transmissions match "${searchQuery}".`
                : statusFilter !== "all"
                ? `No ${statusFilter} inquiries found.`
                : "No contact submissions logged in the database yet."}
            </p>
          </div>
        ) : (
          <div className={styles.contactsList}>
            {contacts.map((c) => {
              const isUnread = c.status === "unread";
              const isReplied = c.status === "replied";
              const isArchived = c.status === "archived";

              let statusClass = styles.statusRead;
              if (isUnread) statusClass = styles.statusUnread;
              if (isReplied) statusClass = styles.statusReplied;
              if (isArchived) statusClass = styles.statusArchived;

              const mailtoSubject = encodeURIComponent(
                `Re: Portfolio Inquiry from ${c.name}`
              );
              const mailtoBody = encodeURIComponent(
                `Hi ${c.name},\n\nThank you for reaching out via my portfolio.\n\n---\nOriginal Message:\n"${c.message}"\n`
              );

              return (
                <article
                  key={c._id}
                  className={`${styles.contactCard} ${
                    isUnread ? styles.contactCardUnread : ""
                  }`}
                >
                  <div className={styles.cardTopRow}>
                    <div className={styles.senderInfo}>
                      <h2 className={styles.senderName}>{c.name}</h2>
                      <a
                        href={`mailto:${c.email}`}
                        className={styles.senderEmail}
                        title="Send email"
                      >
                        {c.email}
                      </a>
                    </div>

                    <div className={styles.cardMetaGroup}>
                      <span className={`${styles.statusBadge} ${statusClass}`}>
                        {c.status || "unread"}
                      </span>
                      <time className={styles.timeTag}>
                        {formatDate(c.createdAt)}
                      </time>
                    </div>
                  </div>

                  {/* Message body text */}
                  <div className={styles.messageBody}>{c.message}</div>

                  {/* Bottom metadata and action buttons */}
                  <div className={styles.cardBottomRow}>
                    <div className={styles.techDetails}>
                      {c.ipAddress && (
                        <span className={styles.techItem}>
                          IP: <strong>{c.ipAddress}</strong>
                        </span>
                      )}
                      {c.userAgent && (
                        <span
                          className={styles.techItem}
                          title={c.userAgent}
                        >
                          AGENT: {c.userAgent.slice(0, 45)}...
                        </span>
                      )}
                    </div>

                    <div className={styles.actionsGroup}>
                      <a
                        href={`mailto:${c.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.actionBtn} ${styles.replyBtn}`}
                        onClick={() => {
                          if (isUnread) {
                            handleStatusChange(c._id, "replied");
                          }
                        }}
                      >
                        REPLY ✉
                      </a>

                      {isUnread ? (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(c._id, "read")}
                          className={styles.actionBtn}
                        >
                          MARK READ
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(c._id, "unread")}
                          className={styles.actionBtn}
                        >
                          MARK UNREAD
                        </button>
                      )}

                      {!isReplied && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(c._id, "replied")}
                          className={styles.actionBtn}
                        >
                          MARK REPLIED
                        </button>
                      )}

                      {!isArchived ? (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(c._id, "archived")}
                          className={styles.actionBtn}
                        >
                          ARCHIVE
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(c._id, "read")}
                          className={styles.actionBtn}
                        >
                          UNARCHIVE
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDelete(c._id, c.name)}
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      >
                        DELETE ✕
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
