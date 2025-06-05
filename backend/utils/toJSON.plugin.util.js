// utils/toJSON.plugin.js
export function toJSONPlugin(schema) {
  schema.virtual("id").get(function () {
    return this._id.toHexString();
  });

  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.password; // only applies if password exists
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    },
  });
}
