import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaUser, FaChevronLeft, FaChevronRight, FaWindows } from "react-icons/fa";
import { BsFiletypeExe } from "react-icons/bs";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";


function Dashboard() {

    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const { user, logout, isAuthenticated } = useAuth();
    const username = user?.username || '';
    // useNotifications(isAuthenticated);
    

    const navItems = [
        { label: "Overview", path: "/dashboard/session", icon: FaHome },
        { label: "Executable", path: "/dashboard/executable", icon: BsFiletypeExe },
        { label: "Windows", path: "/dashboard/windows", icon: FaWindows },
        { label: "Account", path: "/dashboard/account", icon: FaUser },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="app-container">
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
                style={{
                    flexBasis: collapsed ? '70px' : '200px',
                    maxWidth: collapsed ? '70px' : '200px',
                }}>
                {/* Logo */}
                <div className="sidebar-header">
                    <div className="app-icon" style={{ margin: collapsed ? '0 auto' : '0' }}>
                        <img 
                            src="/logo-obsidianrat.png" 
                            alt="ObsidianRAT Logo" 
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                        />
                    </div>
                    {!collapsed && (
                        <span style={{ color: 'var(--sidebar-main-color)', fontSize: '14px', fontWeight: '600' }}>
                            ObsidianRAT
                        </span>
                    )}
                </div>

                {/* Navigation */}
                <ul className="sidebar-list">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <li
                                key={item.path}
                                className={`sidebar-list-item ${active ? 'active' : ''}`}
                            >
                                <Link to={item.path} onClick={() => setMobileOpen(false)} title={collapsed ? item.label : ''}>
                                    <Icon style={{ fontSize: '18px' }} />
                                    {!collapsed && <span>{item.label}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Collapse Button */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="collapse-btn"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        margin: '8px 16px',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '8px',
                        backgroundColor: 'var(--sidebar-hover-link)',
                        color: 'var(--sidebar-link)',
                        cursor: 'pointer',
                        fontSize: '14px',
                    }}
                >
                    {collapsed ? <FaChevronRight /> : <><FaChevronLeft /> <span>Collapse</span></>}
                </button>

                {/* User Section */}
                <div
                    className="account-info"
                    onClick={logout}
                    style={{ cursor: 'pointer' }}
                    title="Logout"
                >
                    <div className="account-info-picture" style={{
                        background: 'linear-gradient(135deg, var(--action-color), #8b5cf6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '14px',
                    }}>
                        {username.charAt(0).toUpperCase()}
                    </div>
                    {!collapsed && <div className="account-info-name">{username}</div>}
                    <div
                        className="account-info-more"
                        style={{
                            marginLeft: collapsed ? '0' : 'auto',
                        }}
                    >
                        <FaSignOutAlt />
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="app-content">
                <header className="mobile-header" style={{
                    display: 'none',
                    padding: '16px',
                    borderBottom: '1px solid var(--table-border)',
                }}>
                    <button
                        onClick={() => setMobileOpen(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--app-content-main-color)',
                            fontSize: '24px',
                            cursor: 'pointer',
                        }}
                    >
                        <HiOutlineMenuAlt2 />
                    </button>
                </header>

                {/* Page Content */}
                <main>
                    <Outlet />
                </main>
            </div>

            <style>{`
                @media screen and (max-width: 1024px) {
                    .sidebar {
                        display: flex !important;
                        position: fixed;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        z-index: 50;
                        transform: translateX(-100%);
                        transition: transform 0.3s ease;
                    }
                    .sidebar.mobile-open {
                        transform: translateX(0);
                    }
                    .mobile-header {
                        display: flex !important;
                    }
                    .collapse-btn {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default Dashboard;