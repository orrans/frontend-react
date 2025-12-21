import React, { useState } from 'react'

export function UserProfile() {
    const [activeTab, setActiveTab] = useState('about')

    // Hardcoded user for display
    const user = {
        fullname: "Puki Puki",
        imgUrl: "https://robohash.org/RemoteCar?set=set4&size=180x180",
        joined: "2023",
        isSuperhost: false
    }

    return (
        <main className="user-profile-page">
            <div className="profile-layout">

                {/* Left Sidebar */}
                <aside className="profile-sidebar">
                    <h1>Profile</h1>

                    <div className="profile-nav">
                        <nav>
                            <button
                                className={activeTab === 'about' ? 'active' : ''}
                                onClick={() => setActiveTab('about')}>About me</button>
                            <button
                                className={activeTab === 'trips' ? 'active' : ''}
                                onClick={() => setActiveTab('trips')}>Past trips</button>
                            <button
                                className={activeTab === 'connections' ? 'active' : ''}
                                onClick={() => setActiveTab('connections')}>Connections</button>
                        </nav>
                    </div>
                </aside>

                {/* Right Content */}
                <section className="profile-content">
                    {activeTab === 'about' && (
                        <div className="about-me">
                            <h1>About me</h1>
                            <div className="profile-card">
                                <div className="avatar-container">
                                    {user.imgUrl ?
                                        <img src={user.imgUrl} alt={user.fullname} /> :
                                        <div className="placeholder-avatar">{user.fullname.charAt(0)}</div>
                                    }
                                </div>
                                <h2>{user.fullname}</h2>
                                <p className="guest-label">Tel Aviv</p>
                            </div>

                            <div className="info-block">
                                <div className="info-item">School: Coding Academy</div>
                                <div className="info-item">Work: Software Developer</div>
                                <div className="info-item">Lives in Tel Aviv</div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'trips' && (
                        <div className="past-trips">
                            <h1>Past trips</h1>
                            <p className="empty-state">No trips yet...</p>
                        </div>
                    )}
                    {activeTab === 'connections' && (
                        <div className="connections">
                            <h1>Connections</h1>
                            <p className="empty-state">0 connections</p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}