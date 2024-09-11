const getUnis = (req, res) => {
  res.json({ success: true, message: 'universities route' });
};

const getSingleUni = (req, res) => {
  const { id } = req.params;
  res.json({ success: true, message: `${id} university details` });
};

module.exports = { getUnis, getSingleUni };
