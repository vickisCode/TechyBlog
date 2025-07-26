const userDetails = require('../Modals/User')

exports.userProfile = async (req, res) => {
    try {
        const userDetail = await userDetails.findById(req.params.Id);

        if (!userDetail) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'Your profile is here',
            userDetail: userDetail
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        });
    }
};


// Update Profile

exports.updateProfileById = async (req, res) => {
    try {
        // Optional: Validate ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.Id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Check if user exists
        const user = await userDetails.findById(req.params.Id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Optional: Authorization check
        // if (user._id.toString() !== req.user.id) {
        //     return res.status(403).json({ message: 'Not authorized to update this profile' });
        // }

        // Perform update
        const updatedUser = await userDetails.findByIdAndUpdate(
            req.params.Id,
            { $set: req.body },
            { new: true, runValidators: true } // ensure updated data is validated
        );

        res.status(200).json({
            message: 'Profile updated successfully',
            updatedUser
        });

    } catch (err) {
        console.error('Update Error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};


// Partial profile update (only provided fields)


exports.patchProfileById = async (req, res) => {
    try {
        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.Id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Patch/update the user
        const updatedUser = await userDetails.findByIdAndUpdate(
            req.params.Id,
            { $set: req.body },
            { new: true, runValidators: true }  // runValidators ensures schema rules are enforced
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: 'Profile fields updated',
            updatedUser
        });

    } catch (err) {
        console.error('Patch error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};


