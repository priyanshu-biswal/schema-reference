import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  // User form state
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Post form state
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/users`);
      setUsers(res.data);
      if (res.data.length > 0 && !selectedUserId) {
        setSelectedUserId(res.data[0]._id);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!userName || !userEmail) return alert('Please enter all fields');
    try {
      await axios.post(`${API_BASE}/users`, {
        name: userName,
        email: userEmail,
      });
      setUserName('');
      setUserEmail('');
      fetchUsers();
      alert('User added successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add user');
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!postTitle || !postContent || !selectedUserId) {
      return alert('Please fill in all post fields');
    }
    try {
      await axios.post(`${API_BASE}/posts`, {
        title: postTitle,
        content: postContent,
        userId: selectedUserId,
      });
      setPostTitle('');
      setPostContent('');
      fetchPosts();
      alert('Post created successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create post');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">Mongoose Reference App</h1>
          <p className="text-slate-500 text-sm mt-1">Connect Mongoose schemas & display populated data</p>
        </header>

        {/* Forms Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create User Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Create User</h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200 text-sm"
              >
                Add User
              </button>
            </form>
          </div>

          {/* Create Post Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Create Post</h2>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Post Title</label>
                <input
                  type="text"
                  placeholder="My First Post"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Content</label>
                <textarea
                  placeholder="Write content here..."
                  rows="3"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Select Author</label>
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                  required
                >
                  <option value="" disabled>Select User</option>
                  {users.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-200 text-sm"
              >
                Add Post
              </button>
            </form>
          </div>
        </div>

        {/* Display Posts Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Posts Feed</h2>
          {posts.length === 0 ? (
            <p className="text-slate-400 text-sm">No posts created yet.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post._id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <h3 className="text-lg font-bold text-slate-800">{post.title}</h3>
                  <p className="text-slate-600 text-sm">{post.content}</p>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span>
                      <strong className="text-slate-700">Author:</strong> {post.user ? post.user.name : 'Unknown'}
                    </span>
                    <span>
                      <strong className="text-slate-700">Email:</strong> {post.user ? post.user.email : 'N/A'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;