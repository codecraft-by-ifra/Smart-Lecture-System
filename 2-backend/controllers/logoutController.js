exports.logout = (req, res) => {
    // If using sessions
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.clearCookie('connect.sid'); // If using cookie session
            return res.json({ message: 'Logout successful' });
        });
    } else {
        // No session? Just send success
        res.json({ message: 'Logged out successfully (no session)' });
    }
};
