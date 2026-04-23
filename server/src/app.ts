import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import searchRoutes from './routes/search.routes';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "blob:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://*", "http://*"], // Allow all images for logos
      connectSrc: ["'self'", "https://*", "http://*"], // Allow connecting to APIs
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
}));
app.disable('x-powered-by');

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Request size limit
app.use(express.json({ limit: '10kb' }));

// Logging
app.use(morgan('combined'));

// Routes
app.use('/api/v1/search', searchRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const rootDir = process.cwd();
  // In monorepo, if started from root: ./client/dist
  // If started from server: ../client/dist
  const clientDistPath = require('fs').existsSync(path.join(rootDir, 'client/dist'))
    ? path.join(rootDir, 'client/dist')
    : path.join(rootDir, '../client/dist');

  console.log(`[Production] Serving assets from: ${clientDistPath}`);
  
  app.use(express.static(clientDistPath));
  
  app.get('*', (req, res) => {
    // Prevent infinite loops for missing API routes
    if (req.path.startsWith('/api/v1')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    
    const indexPath = path.join(clientDistPath, 'index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('Error sending index.html:', err);
        res.status(500).send('Error loading the application. Please check if the client build exists.');
      }
    });
  });
}

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

export default app;
