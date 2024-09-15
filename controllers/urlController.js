const Url = require('../models/Url');
const crypto = require('crypto');

exports.shortenUrl = async (req, res) => {
  const { longUrl } = req.body;
  try {
    const shortUrl = crypto.randomBytes(6).toString('hex');
    const newUrl = new Url({ longUrl, shortUrl, userId: req.user.id });
    await newUrl.save();

    res.json({ shortUrl });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
