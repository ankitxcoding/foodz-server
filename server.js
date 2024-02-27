import express from 'express';
import cors from 'cors';
import fetch from 'cross-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const RES_CARD_API =
  "https://www.swiggy.com/dapi/restaurants/list/v5";

const RES_MENU_API =
  "https://www.swiggy.com/dapi/menu/pl";

// For Restaurant API
app.get('/dapi/restaurants', async (req, res) => {
  const { lat, lng, page_type } = req.query;

  const url = `${RES_CARD_API}?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=${page_type}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

// For Menu API
app.get('/dapi/menu', async (req, res) => {
  const { 'page-type': page_type, 'complete-menu': complete_menu, lat, lng, submitAction, restaurantId } = req.query;

  const url = `${RES_MENU_API}?page-type=${page_type}&complete-menu=${complete_menu}&lat=${lat}&lng=${lng}&submitAction=${submitAction}&restaurantId=${restaurantId}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

// Endpoint for Logo
app.get('/logo', (req, res) => {
  res.json({ "logo_url": LOGO });
});

// Endpoint for Restaurant Image
app.get('/res-image', (req, res) => {
  res.json({ "image_url": RES_IMG });
});

// Default endpoint
app.get('/', (req, res) => {
  res.json({ "test": "Welcome to foodz by ankitxcoding (ankitz9)! - See Live Web URL for this Server - https://foodz-nine.vercel.app" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
