/**
 * @ignore
 */
var express = require('express');
/**
 * @ignore
 */
const Company = require('../models').company;
const Role = require('../models').role;
const User = require('../models').user;

//
// Authentication, rights, invitations routes
//
/**
 * This is the router for the company related routes
 */
var companyRouter = express.Router();

module.exports = companyRouter;
