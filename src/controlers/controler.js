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
    const publisher = $(el).find(".c_a_a").text();
    await Schema.deleteMany();
    const data = await Schema.create({
      title: title,
      body: body,
      publisher: publisher,
    });
    return data;
  });
}

init();

const getAll = async (req, res) => {
  try {
    let data = await Schema.find({
      published: true,
    })
      .sort({ date: -1 })
      .limit(5);

    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const createNews = async (req, res) => {
  const news = await Schema.create(req.body);
  res.status(200).json({ news });
};

const putNews = async (req, res) => {
  try {
    const { _id } = req.params;
    const put = await Schema.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });
    res.status(200).json({ put });
  } catch (error) {
    res.status(404).json({ msg: "ID INCORRECTO" });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { _id } = req.params;
    const eliminado = await Schema.findOneAndDelete({ _id });
    res.status(200).json({ eliminado });
  } catch (error) {
    res.status(404).json({ msg: "ID INCORRECTO" });
  }
};

module.exports = {
  getAll,
  createNews,
  putNews,
  deleteNews,
};
