interface ProfileModel {
  id: number;
  role_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  publisher_category: string;
  company_name: string;
  email_verified_at: string;
  podcast_goal_updated_at: string;
  created_at: string;
  updated_at: string;
  profile_image_url: string;
  address: string;
  image: string;
  settings: string;
  role: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
}

interface ProfileAnalyticsResponse {
  data: ProfileData;
  message: string;
}

interface ProfileData {
  follower_count: number;
  following_count: number;
  minutes_listened: number | null;
  token_balance: number;
}

interface ProfileTopPodcastResponse {
  data: ProfileTopPodcast;
  message: string;
}

interface ProfileTopPodcast {
  data: ProfileTopPodcastData[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface ProfileTopPodcastData {
  id: number;
  user_id: number;
  title: string;
  author: string;
  category_name: string;
  category_type: string;
  picture_url: string;
  cover_picture_url: string | null;
  description: string;
  created_at: string;
  updated_at: string;
  is_subscribed: boolean;
  subscriber_count: number;
  publisher: {
    id: number;
    first_name: string;
    last_name: string;
    company_name: string;
    profile_image_url: string | null;
    created_at: string;
    updated_at: string;
  };
}
