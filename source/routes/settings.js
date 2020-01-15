/**
 * @ignore
 */
var express = require('express');
/**
 * @ignore
 */
const Company = require('../models').company;
/**
 * @ignore
 */
const Role = require('../models').role;
/**
 * @ignore
 */
const User = require('../models').user;

//
// Authentication, rights, invitations routes
//
/**
 * This is the router for the company related routes
 */
var companyRouter = express.Router();

module.exports = companyRouter;
