import mongoose, { Document, Schema } from 'mongoose';

export interface Group extends Document {
  name: string;
  users: mongoose.Types.ObjectId[];
}

const groupSchema = new Schema<Group>({
  name: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const GroupModel = mongoose.model<Group>('Group', groupSchema);

export default GroupModel;
