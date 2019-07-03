const os = require('os')
const { exec } = require('child_process')

/**
 * 
 * @param {string} path Ex: '/' for Linux and 'C:' for Windows
 * @returns {Promise<{used: number, free: number, total: number}>}
 */
module.exports = (path = os.platform() == 'win32' ? 'C:' : '/') => new Promise((resolve, reject) => {
	if (os.platform() == 'win32') {
		exec(`wmic logicaldisk where name='${path}' get size,freespace`, (error, stdout, stderr) => {
			if(error) reject(error)
			else if(stderr) reject(new Error(stderr))
			else {
				const line = stdout.split('\n')[1]
				const parts = line.split(/\s+/g)
				const free = parseInt(parts[0])
				const total = parseInt(parts[1])
				const used = total - free
				resolve({ used, free, total })
			}
		})
	}
	else {
		exec(`df ${path}`, (error, stdout, stderr) => {
			if (error) reject(error)
			else if (stderr) reject(new Error(stderr))
			else {
				const line = stdout.split('\n')[1]
				const parts = line.split(/\s+/g)
				const used = parseInt(parts[2])
				const free = parseInt(parts[3])
				const total = used + free
				resolve({ used, free, total })
			}
		})
	}
})