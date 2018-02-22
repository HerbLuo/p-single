/**
 * p-single
 * change logs:
 * 2017/11/5 herbluo created
 */
export const pSingle = fn => {
  const suspends = []
  let isRunning = false

  return (...args) => new Promise((resolve, reject) => {
    const success = val => {
      resolve(val)
      suspends.forEach(({resolve}) => resolve(val))
      isRunning = false
    }
    const fail = err => {
      reject(err)
      suspends.forEach(({reject}) => reject(err))
      isRunning = false
    }

    if (!isRunning) {
      isRunning = true
      fn(...args).then(success, fail)
    } else {
      suspends.push({resolve, reject})
    }
  })
}

export default pSingle

export const PSingle = (thisBinding) => {
  return (target, property, descriptor) => {
    descriptor.value = pSingle(
      descriptor.value.bind(thisBinding || target)
    )
  }
}
