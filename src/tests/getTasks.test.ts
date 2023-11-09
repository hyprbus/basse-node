const test = async () => {
  const noOfFetches = Array.from(Array(10))

  const data = await Promise.all(
    noOfFetches.map(() =>
      fetch('http://localhost:5000/tasks').then(res => res.status),
    ),
  )

  console.log(data)
}

test()
