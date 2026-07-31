
router.post(
  '/book-cover',
  protect,
  upload.single('cover'),
  async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(
        req.body.bookId,
        { coverImage: req.file.filename },
        { new: true },
      );
      res.status(200).json({ success: true, data: book });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
);
