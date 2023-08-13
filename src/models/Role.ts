import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
    {
        value: {
            type: String,
            unique: true,
            default: "USER",
        },
    },
    { versionKey: false },
);

const Role = mongoose.model('Role', roleSchema);

export default Role;
