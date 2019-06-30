const handleChannels = (req, res, rp, $, url) => {
  rp(url)
    .then((html) => {
      let channels = [
        'LRT Televizija',
        'LRT Plius',
        'LRT Lituanica',
        'LRT Radijas',
        'LRT Klasika',
        'LRT Opus'
      ]
      let titleArray = [];
      let timeArray = [];
      let linkArray = [];
      let data = [];

      //Pulling required data from LRT website
      $('.data-block__text', html).map((i, e) => {
        timeArray.push($(e).text())
      });

      $('.channel-item__title', html).map((i, e) => {
        titleArray.push($(e).text())
      });

      $('.channel-item__link', html).map((i, e) => {
        linkArray.push($(e).attr('href'))
      });

      //Putting the pulled information to an array, which will be sent to FrontEnd
      let i;
      for (i = 0; i < 6; i++) {
        data.push({
          'channel': channels[i],
          'time': timeArray[i],
          'title': titleArray[i],
          'link': 'https://www.lrt.lt' + linkArray[i]
        });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log('Something went wrong', err);
    })
}

module.exports = {
  handleChannels: handleChannels
}
