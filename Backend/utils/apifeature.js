// const { json } = require("express");

class ApiFeatures {
  constructor(query, qureyStr) {
    (this.query = query), (this.qureyStr = qureyStr);
    // console.log(this.qureyStr);
  }
  search() {
    const keyword = this.qureyStr.keyword
      ? {
          name: {
            $regex: this.qureyStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.qureyStr };

    //Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    //Filter For Price And Rating

    let qureyStr = JSON.stringify(queryCopy);
    qureyStr = qureyStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(qureyStr));

    return this;
  }

  pagination(resutPerPage) {
    const currentPage = Number(this.qureyStr.page) || 1;
    const skip = resutPerPage * (currentPage - 1);

    this.query = this.query.limit(resutPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
