'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Meteor {
  id: number
  left: number
  top: number
  animationDelay: number
  animationDuration: number
}

interface MeteorShowerProps {
  number?: number
  className?: string
  meteorColor?: string
  tailLength?: number
  direction?: number
  targetY?: number
}

export default function MeteorShower({
  number = 0,
  className = '',
  meteorColor = '#ababab',
  tailLength = 50,
  direction = 45,
  targetY = window.innerHeight * 0.8,
}: MeteorShowerProps) {
  const [meteors, setMeteors] = useState<Meteor[]>([])
  const timerRef = useRef()
  useEffect(() => {
    const generateMeteor = () => {
      const newMeteor = {
        id: Date.now(),
        left: Math.random() * window.innerWidth,
        top: 0, // 改为从顶部开始
        animationDelay: 0,
        animationDuration: 3 + Math.random() * 2, // 减慢速度，范围缩小为3-5秒
        rotate: direction,
      }

      setMeteors((prev) => [...prev.slice(-number), newMeteor])
    }

    // 初始生成一批流星
    const initialMeteors = Array(number)
      .fill(0)
      .map((_, i) => ({
        id: i,
        left: Math.random() * window.innerWidth,
        top: 0, // 改为从顶部开始
        animationDelay: Math.random() * 2, // 减小随机延迟范围
        animationDuration: 3 + Math.random() * 2, // 减慢速度，范围缩小为3-5秒
        rotate: direction,
      }))
    setMeteors(initialMeteors)

    // 设置定时器持续生成新流星
    timerRef.current = setInterval(generateMeteor, 300)

    const handleResize = () => {
      setMeteors((prev) =>
        prev.map((m) => ({
          ...m,
          left: Math.random() * window.innerWidth,
          top: 0, // 改为从顶部开始
        }))
      )
    }

    window.addEventListener('resize', handleResize)
    return () => {
      // 清除定时器和事件监听
      if (timerRef.current) clearInterval(timerRef.current)
      window.removeEventListener('resize', handleResize)
      // 重置流星状态
      setMeteors([])
    }
  }, [number, direction])

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}>
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="absolute"
          style={{
            left: `${meteor.left}px`,
            top: `${meteor.top}px`,
            transform: `rotate(${direction}deg)`,
          }}
          initial={{ opacity: 1 }}
          animate={{
            y: targetY - meteor.top,
            x: targetY - meteor.top, // 添加x轴移动
            opacity: [1, 0.8, 0.5, 0.3, 0],
            rotate: 0, // 动画过程中不再旋转 // 添加旋转到动画中`
          }}
          transition={{
            delay: meteor.animationDelay,
            duration: meteor.animationDuration,
            ease: 'linear',
          }}
        >
          <div
            className="meteor-trail "
            style={{
              width: `${tailLength}px`,
              height: '3px',
              background: `linear-gradient(to left, ${meteorColor}, transparent)`,
              transformOrigin: 'right center',
              transform: `rotate(${direction}deg)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
