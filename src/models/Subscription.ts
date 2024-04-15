import { Schema, model } from "mongoose";

interface SubscriptionTypes {
  userId: Schema.Types.ObjectId;
  plan: "basic" | "standard" | "premium";
  startDate: Date;
  endDate: Date;
}

const subscriptionSchema = new Schema<SubscriptionTypes>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    plan: { type: String, enum: ["basic", "standard", "premium"], required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Subscription = model<SubscriptionTypes>("subscriptions", subscriptionSchema);

export { Subscription, SubscriptionTypes };

