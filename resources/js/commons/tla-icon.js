import React from 'react'
import Home from '../assets/icons/home.svg'
import Drugs from '../assets/icons/drugs.svg'
import Orders from '../assets/icons/orders.svg'
import People from '../assets/icons/people.svg'
import Sales from '../assets/icons/sales.svg'
import Settings from '../assets/icons/settings.svg'
import Avatar from '../assets/icons/avata.svg'
import Accounts from '../assets/icons/apps/accounts.svg'
import Beaker from '../assets/icons/apps/beaker.svg'
import Doctor from '../assets/icons/apps/doctor.svg'
import Pregnancy from '../assets/icons/apps/pregnancy.svg'
import Store from '../assets/icons/apps/store.svg'
import Records from '../assets/icons/apps/records.svg'
import Medicine from '../assets/icons/apps/medicine.svg'
import Nurse from '../assets/icons/apps/nurse.svg'
import Cogs from '../assets/icons/apps/cogs.svg'
import Logout from '../assets/icons/logout.svg'
import PropTypes from 'prop-types'
import { ReactSVG } from "react-svg";

const iconTypes = {
  home: Home,
  drugs: Drugs,
  orders: Orders,
  people: People,
  sales: Sales,
  settings: Settings,
  avatar: Avatar,
  accounts: Accounts,
  beaker: Beaker,
  doctor: Doctor,
  pregnancy: Pregnancy,
  store: Store,
  records: Records,
  medicine: Medicine,
  nurse: Nurse,
  cogs: Cogs,
  logout: Logout,
}

export default function TlaIcon({ name, width }) {
  return <ReactSVG src={iconTypes[name]} />

}

TlaIcon.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.number
}
