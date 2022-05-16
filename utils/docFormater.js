const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

module.exports.docFormater = (item) => {
  return {
    ...item._doc,
    createdAt: formatDate(item._doc.createdAt),
    updatedAt: formatDate(item._doc.updatedAt),
  };
};
