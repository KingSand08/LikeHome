import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get('https://hotels-com-provider.p.rapidapi.com/regions', {
        headers: {
          'x-rapidapi-host': process.env.RAPIDAPI_HOST,
          'x-rapidapi-key': process.env.RAPIDAPI_HOTEL_API_KEY,
        },
      });

      return res.status(200).json(response.data); 
    } catch (error) {
      console.error('Error fetching regions:', error);
      return res.status(500).json({ error: 'Failed to fetch regions' });
    }
  }
  return res.status(405).end(); 
}
