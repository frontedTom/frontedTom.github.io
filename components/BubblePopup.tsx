import React, { useState, useRef, useEffect } from 'react'

interface BubblePopupProps {
  children: React.ReactNode
  popupContent: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

const BubblePopup: React.FC<BubblePopupProps> = ({
  children,
  popupContent,
  placement = 'bottom',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  // 处理点击事件，切换弹窗显示状态
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  // 点击页面其他地方关闭弹窗
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  // 计算弹窗位置
  useEffect(() => {
    if (isOpen && triggerRef.current && popupRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const popupRect = popupRef.current.getBoundingClientRect()
      const windowScrollY = window.scrollY
      const windowScrollX = window.scrollX

      let newPosition = { top: 0, left: 0 }

      switch (placement) {
        case 'top':
          newPosition = {
            top: triggerRect.top - popupRect.height + windowScrollY,
            left: triggerRect.left + triggerRect.width / 2 - popupRect.width / 2 + windowScrollX,
          }
          break
        case 'bottom':
          newPosition = {
            top: triggerRect.bottom + windowScrollY,
            left: triggerRect.left + triggerRect.width / 2 - popupRect.width / 2 + windowScrollX,
          }
          break
        case 'left':
          newPosition = {
            top: triggerRect.top + triggerRect.height / 2 - popupRect.height / 2 + windowScrollY,
            left: triggerRect.left - popupRect.width + windowScrollX,
          }
          break
        case 'right':
          newPosition = {
            top: triggerRect.top + triggerRect.height / 2 - popupRect.height / 2 + windowScrollY,
            left: triggerRect.right + windowScrollX,
          }
          break
      }

      setPosition(newPosition)
    }
  }, [isOpen, placement])

  return (
    <div className="relative inline-block" ref={triggerRef} onClick={handleClick}>
      {children}
      {isOpen && (
        <div
          ref={popupRef}
          className="absolute z-50 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            minWidth: '200px',
          }}
        >
          {popupContent}

          {/* 气泡箭头 */}
          <div
            className={`absolute ${
              placement === 'top'
                ? 'bottom-0 left-1/2 translate-x-[-50%] translate-y-[100%] transform'
                : placement === 'bottom'
                  ? 'left-1/2 top-0 translate-x-[-50%] translate-y-[-100%] transform'
                  : placement === 'left'
                    ? 'right-0 top-1/2 translate-x-[100%] translate-y-[-50%] transform'
                    : 'left-0 top-1/2 translate-x-[-100%] translate-y-[-50%] transform'
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${
                placement === 'top'
                  ? 'rotate-180'
                  : placement === 'left'
                    ? 'rotate-90'
                    : placement === 'right'
                      ? 'rotate-270'
                      : ''
              }`}
            >
              <path
                d="M0.75 4.5L6 9.75L11.25 4.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="dark:stroke-gray-800"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

export default BubblePopup
