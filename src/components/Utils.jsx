import axios from "axios";
import { useDispatch } from "react-redux";
import { useUI } from "../utils/UIContext";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../redux/userSlice";
import { IMaskInput } from "react-imask";
import React from "react";

export const etcString = (str, maxChar) => {
  return (str.length <= maxChar ? str : (str.substr(0, maxChar) + "..."))
}

export const capitalizeFirstLetter = (string) => {
  return string
    .split(' ') // Boşluklardan böl
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Her kelimenin ilk harfini büyük yap
    .join(' '); // Tekrar birleştir
}

export const PaymentTypes = {
  CREDIT_CARD: "Kredi Kartı",
  CASH_ON_DELIVERY: "Kapıda Ödeme"
};

export const OrderStatus = {
  RECEIVED: "Sipariş alındı",
  GETTING_READY: "Sipariş hazırlanıyor",
  ON_THE_WAY: "Sipariş yolda",
  DELIVERED: "Teslim edildi",
  CANCELED: "Sipariş iptal edildi"
};

export const OrderStatusColor = {
  RECEIVED: "neutral",
  GETTING_READY: "primary",
  ON_THE_WAY: "warning",
  DELIVERED: "success",
  CANCELED: "danger"
};

export async function getCoordinates(address) {
  const apiKey = 'AIzaSyAn7jrZBPBwXrELrF6vu2d0UaFYikEdZVg';
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
    if (data.results.length > 0) {
      const coordinates = data.results[0].geometry.location;
      console.log(coordinates);
      return coordinates;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting coordinates: ", error);
    return null;
  }
}

export async function calculateDistance(address1, address2) {
  const coords1 = await getCoordinates(address1);
  const coords2 = await getCoordinates(address2);

  if (coords1 && coords2) {
    const distanceMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${coords1.lat},${coords1.lng}&destinations=${coords2.lat},${coords2.lng}&key=AIzaSyAn7jrZBPBwXrELrF6vu2d0UaFYikEdZVg`;

    try {
      const response = await axios.get(distanceMatrixUrl);
      const data = response.data;
      if (data.rows.length > 0) {
        const distance = data.rows[0].elements[0].distance.text;
        console.log(distance);
        return distance;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error calculating distance: ", error);
      return null;
    }
  } else {
    return null;
  }
}

export function openSidebar() {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
  }
}

export function closeSidebar() {
  if (typeof document !== 'undefined') {
    document.documentElement.style.removeProperty('--SideNavigation-slideIn');
    document.body.style.removeProperty('overflow');
  }
}

export function toggleSidebar() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--SideNavigation-slideIn');
    if (slideIn) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}

export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;

  const elapsed = now - past;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' sn';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' dk';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' sa';
  } else {
    return Math.round(elapsed / msPerDay) + ' gün';
  }
}

