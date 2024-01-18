module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },

  format_amount: (amount) => {
    return parseInt(amount).toLocaleString();
  },

  is_user_page: (pageUser, userId) => {
    return pageUser === userId;
  },
};
