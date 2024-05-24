export const getUsername = (value?: string | null) => {
  if (!value) return "Not Found";
  return value.replace("@user.profile", "");
};
