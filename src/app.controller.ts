import { Controller, Get, Post, Render, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import type { userReserv } from './userReserv.js';
import { ReserveDto } from './reserv.dto.js';
import { error } from 'console';
import { isEmpty } from 'rxjs';
import e from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  async getHello() {
    return {
      title: 'Get your reservation here!',
      guests: await this.appService.getGuests(),
      message: "",
      isError: false
    }
  }

  @Post()
  @Render('index')
  async postUserReserv(@Body() reservData: ReserveDto) {
    const nameRegex = /^([A-ZÁÉÚŐÓÜÖÍ]([a-záéúőóüöí.]+\s?)){2,}$/
    const emailRegex = /^[a-zA-Z][a-z\d_]{0,}[@][a-z\d_]{0,}[.][a-z]{0,}$/
    const currentDate = new Date().getDate()
    const guestsRegex = /^([1-9]|10)$/

    let message = ""
    let isError = false

    if (!nameRegex.test(reservData.name)) {
      message = "Invalid Name!"
      isError = true
    }

    if (!emailRegex.test(reservData.email)) {
      message = "Invalid Email!"
      isError = true
    }

    if (currentDate > new Date(reservData.startDate).getDate()) {
      message = "Invalid Date!"
      isError = true
    }
    /*}
    else {
      message = "Select a Date!"
      isError = true
    }*/


    if (!guestsRegex.test(reservData.guests.toString())) {
      message = "Invalid Guest Number!"
      isError = true
    }

    if (!isError) {
      await this.appService.addReservation(reservData)
      message = "Successfull Reservation!"
    }

    return {
      title: 'Get your reservation here!',
      guests: await this.appService.getGuests(),
      message: message,
      isError: isError
    }
  }
}
