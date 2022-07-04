const Schema = require("../model/model");
const cheerio = require("cheerio");
const request = require("request-promise");

async function init() {
  const $ = await request({
    uri: "https://elpais.com/",
    transform: (body) => cheerio.load(body),
  });

  $("#fusion-app article").each(async (i, el) => {
    const title = $(el).find("h2").text();
    const body = $(el).find(".c_d").text();
    //let image = $(el).find('img').text()
    const source = $(el).find(".c_a_a").text();
    const data = await Schema.create({
      title: title,
      body: body,
      source: source,
    });
    return data;
  });
}

init();

const getAll = async (req, res) => {
  try {
    let data = await Schema.find({});
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
};
