const { spawnSync, execSync } = require('child_process')

/**
 * Task model
 *   from taskwarrior
 */
// FIXME: これを定義すると No exports provided になってしまう
// でもクラスにしたほうがいいので使いたい
// class Task {
//   constructor (options) {
//     this.id = options.id
//     this.uuid = options.uuid
//     this.description = options.description || ''
//     this.due = options.due || ''
//     this.entry = options.entry || ''
//     this.modified = options.modified || ''
//     this.end = options.end || ''
//     this.status = options.status || ''
//     this.project = options.project || ''
//     this.priority = options.priority || ''
//     this.tags = options.tags || ''
//     this.urgency = options.urgency || ''
//   }
// }

// exports.Task = Task

const compareTask = (a, b) => {
  if (!a.due && b.due) {
    return -1
  } else if (a.due && !b.due) {
    return 1
  }

  if (a.due < b.due) {
    return -1
  } else if (a.due === b.due) {
    return 0
  } else {
    return 1
  }
}

/**
 * get Tasks with custom filter
 *   from `task [filter] export` command
 */
exports.exportTasks = (filter = []) => {
  const cmd = spawnSync('task', filter.concat(['export']))

  if (cmd.stderr.length > 0) {
    throw cmd.stderr.toString()
  }

  const tasksObj = JSON.parse(cmd.stdout.toString())
  return tasksObj
  // return tasksObj.map(taskObj => { return new Task(taskObj) })
}

/**
 * get All Tasks
 *   from `task [filter] export` command
 */
exports.getTasks = (filter = []) => {
  return exports.exportTasks(
    filter.concat([
      '( status:pending or status:waiting or status:completed )'
    ])
  ).sort(compareTask)
}

exports.getUndoneTasks = (filter = []) => {
  return exports.exportTasks(
    filter.concat([
      '( status:pending or status:waiting )'
    ])
  ).sort(compareTask)
}

exports.getDoneTasks = (filter = []) => {
  return exports.exportTasks(
    filter.concat([
      'status:completed'
    ])
  ).sort((a, b) => { return compareTask(b, a) })
}

/**
 * findTask
 */
exports.findTask = uuid => {
  const tasks = exports.exportTasks([`uuid:${uuid}`])

  if (tasks.length === 0) {
    throw new Error(`uuid=${uuid} task not found`)
  }
  return tasks[0]
}

/**
 * get Latest Task
 *   from `task [filter] export` command
 */
exports.getLatestTask = () => {
  const cmd = spawnSync('task', ['+LATEST', 'export'])

  if (cmd.stderr.length > 0) {
    throw cmd.stderr.toString()
  }

  const tasksObj = JSON.parse(
    cmd.stdout.toString()
  )

  return tasksObj
  // return new Task(tasksObj[0])
}

/**
 * add Task
 *   by `task add <mods>` command
 */
exports.addTask = (options) => {
  options = options || {}

  const cmd = spawnSync(
    'task',
    [
      'add',
      'due:' + (options.due || ''),
      'project:' + (options.project || ''),
      'priority:' + (options.priority || ''),
      'tags:' + (options.tags || ''),
      options.description
    ]
  )

  console.log(cmd)

  return true
}

/**
 * modify Task
 *   by `task <filter> modify <mods>` command
 */
exports.modifyTask = (uuid, options) => {
  const cmd = spawnSync(
    'task',
    [
      uuid,
      'modify',
      'due:' + (options.due || ''),
      'project:' + (options.project || ''),
      'priority:' + (options.priority || ''),
      'tags:' + (options.tags || ''),
      options.description
    ]
  )

  console.log(cmd)

  return true
}

/**
 * done Task
 *   by `task <filter> done <mods>` command
 */
exports.doneTask = uuid => {
  const cmd = spawnSync('task', [uuid, 'done'])
  console.log(cmd)

  return true
}

/**
 * undone Task
 *   by `task <filter> modify <mods>` command
 */
exports.undoneTask = uuid => {
  const cmd = spawnSync('task', [uuid, 'modify', 'status:pending'])
  console.log(cmd)

  return true
}

/**
 * delete Task
 *   by `task <filter> delete <mods>` command
 */
exports.deleteTask = uuid => {
  // 先に status を pending にしておかないと削除できないらしい
  const precmd = spawnSync('task', [uuid, 'modify', 'status:pending'])
  console.log(precmd)
  execSync(`yes | task "${uuid}" delete`)

  return true
}

/**
 * getProjects
 */
exports.getProjects = () => {
  return exports.getTasks(['+PROJECT'])
    .map(task => (task.project))
    .filter((project, index, self) => self.indexOf(project) === index) // = uniq
    .filter(project => project) // = compact
    .sort((a, b) => {
      if (a < b) {
        return -1
      } else if (a === b) {
        return 0
      }
      return 1
    })
}
