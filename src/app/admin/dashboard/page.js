"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [actionLoading, setActionLoading] = useState(null);

  // 1. Fetch Contacts with Filter & Search
  const fetchContactsData = useCallback(
    async (status = statusFilter, query = searchQuery) => {
      try {
        setIsRefreshing(true);
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
          setContacts(data.contacts || []);
          if (data.stats) {
            setStats(data.stats);
          }
        }
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      } finally {
        setIsRefreshing(false);
      }
    },
    [statusFilter, searchQuery, router]
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
          setContacts(cData.contacts || []);
          if (cData.stats) setStats(cData.stats);
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

  // 3. Status Update Handler
  const handleStatusChange = async (id, newStatus) => {
    try {
      setActionLoading(id);
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
        );
        // Refresh counts
        setStats((prev) => {
          const updated = { ...prev };
          return updated;
        });
        fetchContactsData();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // 4. Delete Handler
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete inquiry from "${name}"?`)) {
      return;
    }
    try {
      setActionLoading(id);
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
        fetchContactsData();
      }
    } catch (err) {
      console.error("Failed to delete contact:", err);
    } finally {
      setActionLoading(null);
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
            <span className={styles.dashboardTitle}>TRANSMISSIONS LOG</span>
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
                onClick={() => {
                  setStatusFilter(tab);
                  fetchContactsData(tab, searchQuery);
                }}
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
              fetchContactsData(statusFilter, searchQuery);
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
                          disabled={actionLoading === c._id}
                          onClick={() => handleStatusChange(c._id, "read")}
                          className={styles.actionBtn}
                        >
                          MARK READ
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={actionLoading === c._id}
                          onClick={() => handleStatusChange(c._id, "unread")}
                          className={styles.actionBtn}
                        >
                          MARK UNREAD
                        </button>
                      )}

                      {!isReplied && (
                        <button
                          type="button"
                          disabled={actionLoading === c._id}
                          onClick={() => handleStatusChange(c._id, "replied")}
                          className={styles.actionBtn}
                        >
                          MARK REPLIED
                        </button>
                      )}

                      {!isArchived ? (
                        <button
                          type="button"
                          disabled={actionLoading === c._id}
                          onClick={() => handleStatusChange(c._id, "archived")}
                          className={styles.actionBtn}
                        >
                          ARCHIVE
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={actionLoading === c._id}
                          onClick={() => handleStatusChange(c._id, "read")}
                          className={styles.actionBtn}
                        >
                          UNARCHIVE
                        </button>
                      )}

                      <button
                        type="button"
                        disabled={actionLoading === c._id}
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
