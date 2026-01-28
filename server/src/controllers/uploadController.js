const path = require('path');
const fs = require('fs').promises;

/**
 * Upload a CSV file
 */
exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileInfo = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: req.file.path,
      uploadDate: new Date().toISOString(),
      userId: req.userId,
    };

    // In a production app, you would save this metadata to the database
    // For now, we just return the file info

    res.status(201).json({
      message: 'File uploaded successfully',
      file: fileInfo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get list of uploaded files for the current user
 */
exports.getUploads = async (req, res, next) => {
  try {
    const uploadsDir = path.join(__dirname, '../../uploads');
    
    try {
      const files = await fs.readdir(uploadsDir);
      
      const fileStats = await Promise.all(
        files.map(async (filename) => {
          const filePath = path.join(uploadsDir, filename);
          const stats = await fs.stat(filePath);
          
          return {
            filename,
            size: stats.size,
            uploadDate: stats.birthtime,
          };
        })
      );

      // In a production app, filter by userId from database
      // For now, return all files
      res.json({ files: fileStats });
    } catch (err) {
      res.json({ files: [] });
    }
  } catch (error) {
    next(error);
  }
};