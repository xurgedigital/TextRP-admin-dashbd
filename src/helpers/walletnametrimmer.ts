const walletnametrimmer = (name: string) => {
  let a = name?.slice(0, 6) + '...' + name?.slice(-4)
  return a
}

export default walletnametrimmer
