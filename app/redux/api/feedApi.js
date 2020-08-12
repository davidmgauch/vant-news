export const fetchFeedData = async (page, test_data, location) => {
  const loc_lat = location.latitude;
  const loc_lng = location.longitude;
  const loc = `lat=${loc_lat}&lng=${loc_lng}`;
  const url = `http://vant-api-dev.us-east-2.elasticbeanstalk.com/vant/v1/news/feed?${loc}&distance=1000`;
  const staticUrl = 'http://feedapi-env.q3s2j2m2zs.us-east-2.elasticbeanstalk.com/vant/v1/news/feed?lat=34.020333&lng=-118.4923217&distance=1000';

  try {
    const response = await fetch(
      'http://feedapi-env.q3s2j2m2zs.us-east-2.elasticbeanstalk.com/vant/v1/news/feed?lat=34.020333&lng=-118.4923217&distance=1000',
      {
        method: 'GET',
        headers: {
          'page-size': 8,
          'page-no': 0,
          'test-data': false,
        },
      },
    );
    const data = await response.json();
    // console.log('vantApi Data', data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
