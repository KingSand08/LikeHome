import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { region_id } = req.query;

  if (req.method === 'GET') {
    if (!region_id) {
      return res.status(400).json({ error: 'Region ID is required' });
    }

    try {
      const response = await axios.get('https://hotels-com-provider.p.rapidapi.com/hotel-search', {
        params: { region_id },
        headers: {
          'x-rapidapi-host': process.env.RAPIDAPI_HOST,
          'x-rapidapi-key': process.env.RAPIDAPI_HOTEL_API_KEY,
        },
      });

      return res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      return res.status(500).json({ error: 'Failed to fetch hotels' });
    }
  }
  return res.status(405).end();
}