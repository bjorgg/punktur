import React from 'react'
import Link from 'next/link'
import styles from '../styles/MyLink.module.css' 
import { useRouter } from 'next/router'

const MyLink = ({ href, children }) => {
  const router = useRouter()

  let className = children.props.className || ''
  if (router.pathname === href) {
    className = `${className} ${styles.selected}`
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>
}

export default MyLink;
