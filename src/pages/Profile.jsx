import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const Profile = () => {
    const { user, loading, updateUserProfile, setUser } = useAuth();
    const { role, isUserRoleLoading } = useRole();
    const [formValues, setFormValues] = useState({ name: '', photoURL: '' });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!user) return;
        setFormValues({
            name: user.displayName || user.name || '',
            photoURL: user.photoURL || '',
        });
    }, [user]);

    const formatDate = (value) => {
        if (!value) return 'Not available';
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? 'Not available' : date.toLocaleString();
    };

    if (loading) {
        return (
            <div className="p-6">
                <Loading message="Loading profile..." />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-10">
                <div className="rounded-2xl border border-base-200 bg-base-100 p-8 text-center shadow">
                    <h2 className="text-2xl font-semibold">No profile data found</h2>
                    <p className="mt-2 text-base-content/70">
                        Please sign in to view your account details.
                    </p>
                    <Link to="/auth/login" className="btn btn-primary mt-5">
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    const displayName = user.displayName || user.name || 'Anonymous reader';
    const email = user.email || 'Not provided';
    const provider = user.providerData?.[0]?.providerId?.replace('.com', '') || 'Email';
    const canSubmit = formValues.name.trim().length > 0;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormValues({
            name: user.displayName || user.name || '',
            photoURL: user.photoURL || '',
        });
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        if (!canSubmit || isSaving) return;

        setIsSaving(true);
        updateUserProfile({
            displayName: formValues.name.trim(),
            photoURL: formValues.photoURL.trim() || null,
        })
            .then(() => {
                setUser((prev) => ({
                    ...prev,
                    displayName: formValues.name.trim(),
                    photoURL: formValues.photoURL.trim() || null,
                }));
                toast.success('Profile updated successfully.');
            })
            .catch((error) => {
                toast.error(`Failed to update profile: ${error.message}`);
            })
            .finally(() => {
                setIsSaving(false);
            });
    };

    return (
        <div className="px-4 py-8">
            <div className="mx-auto w-full max-w-7xl space-y-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-semibold">Profile</h1>
                    <p className="text-base-content/70">
                        Manage your personal information and account details.
                    </p>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary/30 ring-offset-2 ring-offset-base-100">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={displayName} referrerPolicy="no-referrer" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-base-200 text-lg font-semibold">
                                            {displayName.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold">{displayName}</h2>
                                <p className="text-sm text-base-content/70">{email}</p>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="badge badge-outline capitalize">
                                        {isUserRoleLoading ? 'Loading role...' : role || 'user'}
                                    </span>
                                    <span className={`badge ${user.emailVerified ? 'badge-success' : 'badge-warning'}`}>
                                        {user.emailVerified ? 'Verified' : 'Unverified'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="divider my-6" />

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-base-200 bg-base-200/40 p-4">
                                <p className="text-xs uppercase tracking-wide text-base-content/60">Full Name</p>
                                <p className="mt-1 text-base font-medium">{displayName}</p>
                            </div>
                            <div className="rounded-xl border border-base-200 bg-base-200/40 p-4">
                                <p className="text-xs uppercase tracking-wide text-base-content/60">Email Address</p>
                                <p className="mt-1 text-base font-medium">{email}</p>
                            </div>
                            <div className="rounded-xl border border-base-200 bg-base-200/40 p-4">
                                <p className="text-xs uppercase tracking-wide text-base-content/60">User ID</p>
                                <p className="mt-1 text-base font-medium break-all">{user.uid}</p>
                            </div>
                            <div className="rounded-xl border border-base-200 bg-base-200/40 p-4">
                                <p className="text-xs uppercase tracking-wide text-base-content/60">Provider</p>
                                <p className="mt-1 text-base font-medium capitalize">{provider}</p>
                            </div>
                            <div className="rounded-xl border border-base-200 bg-base-200/40 p-4">
                                <p className="text-xs uppercase tracking-wide text-base-content/60">Member Since</p>
                                <p className="mt-1 text-base font-medium">
                                    {formatDate(user.metadata?.creationTime)}
                                </p>
                            </div>
                            <div className="rounded-xl border border-base-200 bg-base-200/40 p-4">
                                <p className="text-xs uppercase tracking-wide text-base-content/60">Last Sign In</p>
                                <p className="mt-1 text-base font-medium">
                                    {formatDate(user.metadata?.lastSignInTime)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-xl font-semibold">Update profile</h2>
                        <p className="text-sm text-base-content/70">
                            Keep your name and photo up to date across the dashboard.
                        </p>
                        <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleUpdate}>
                            <label className="form-control w-full">
                                <span className="label-text text-sm font-medium">Full name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    placeholder="Your name"
                                    required
                                />
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text text-sm font-medium">Photo URL</span>
                                <input
                                    type="url"
                                    name="photoURL"
                                    value={formValues.photoURL}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </label>
                            <div className="flex flex-wrap gap-3 md:col-span-2">
                                <button className="btn btn-primary" type="submit" disabled={!canSubmit || isSaving}>
                                    {isSaving ? 'Saving...' : 'Save changes'}
                                </button>
                                <button className="btn btn-ghost" type="button" onClick={handleReset} disabled={isSaving}>
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
