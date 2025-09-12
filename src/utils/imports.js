const express = require("express")
const cors = require("cors")
const session = require("express-session")
const passport = require("passport")
const cookieParser = require("cookie-parser")

module.exports = {
    express, cors, session, passport, cookieParser
}