var poll = {
	id: null,
	apiURL: 'http://localhost/api',
	styleURL: 'http://localhost/widgets/poll/style.css',
	data: null,
	total: 0,
	counter: {
		count: {},
		percent: {}
	},
	init(id) {
		this.id = id
		if (document.getElementById(this.id)) {
			this.addStyle()
			fetch(`${this.apiURL}/poll/${id}`, {
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				}
			})
				.then(res => res.json())
				.then(json => {
					if (json.data && json.meta?.cookie) {
						if (this.getCookie(id) == undefined) {
							this.setCookie(id, json.meta.cookie, 30)
						}
						if (this.getCookie('poll_used') == undefined) {
							this.setCookie('poll_used', 'no', 30)
						}
						this.data = json.data
						const cookie = this.getCookie('poll_used')
						cookie == 'no'
							? this.addHTML()
						  : this.addResultHTML()
						this.setTotal()
						if (cookie == 'yes') {
							this.startAnimate()
						}
					}
				})
				.catch(error => {
					console.error(error)
				})
		} else {
			console.log('poll not found')
		}
	},
	addStyle() {
		let style = document.createElement('link')
		style.rel = 'stylesheet'
		style.type = 'text/css'
		style.href = this.styleURL
		document.head.appendChild(style)
	},
	addHTML() {
		let box = document.getElementById(this.id)
		box.innerHTML = ''
		let question = document.createElement('DIV')
		question.innerText = this.data.question
		question.setAttribute('class', 'poll__question')
		box.append(question)
		let options = document.createElement('FORM')
		options.setAttribute('class', 'poll__options-list')
		this.data.options.forEach(el => {
			let div = document.createElement('DIV')
			div.setAttribute('class', 'poll__options-item')
			let radio = document.createElement('INPUT')
			radio.setAttribute('type', 'radio')
			radio.setAttribute('name', 'poll_options')
			radio.setAttribute('value', el.id)
			radio.setAttribute('id', el.id)
			let label = document.createElement('LABEL')
			label.innerText = el.value
			label.setAttribute('for', el.id)
			div.append(radio)
			div.append(label)
			options.append(div)
		})
		box.append(options)
		let btn = document.createElement('BUTTON')
		btn.setAttribute('class', 'poll__btn')
		btn.innerText = 'Выбрать'
		btn.addEventListener('click', (e) => { this.selectOption(e, this.data.id) })
		box.append(btn)
	},
	addResultHTML() {
		let box = document.getElementById(this.id)
		box.innerHTML = ''
		let question = document.createElement('DIV')
		question.innerText = this.data.question
		question.setAttribute('class', 'poll__question')
		box.append(question)
		let list = document.createElement('DIV')
		list.setAttribute('class', 'poll__results-list')
		this.data.options.forEach(el => {
			let item = document.createElement('DIV')
			item.setAttribute('class', 'poll__results-item')
			let label = document.createElement('LABEL')
			label.setAttribute('class', 'result__label')
			label.innerText = el.value
			item.append(label)

			let div = document.createElement('DIV')
			div.setAttribute('class', 'result__counter')
			let svgWrap = document.createElement('DIV')
			let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
			svg.setAttributeNS(null, 'width', '100%')
			svg.setAttributeNS(null, 'height', '6px')
			
			let line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
			line1.setAttributeNS(null, 'x1', '0%')
			line1.setAttributeNS(null, 'x2', '100%')
			line1.setAttributeNS(null, 'y1', '3px')
			line1.setAttributeNS(null, 'y2', '3px')
			line1.setAttributeNS(null, 'stroke-width', '6px')
			line1.setAttributeNS(null, 'stroke', '#bfdbfe')
			svg.append(line1)

			let line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
			line2.setAttributeNS(null, 'id', `line_${el.id}`)
			line2.setAttributeNS(null, 'x1', '0%')
			line2.setAttributeNS(null, 'x2', '0%')
			line2.setAttributeNS(null, 'y1', '3px')
			line2.setAttributeNS(null, 'y2', '3px')
			line2.setAttributeNS(null, 'stroke-width', '6px')
			line2.setAttributeNS(null, 'stroke', '#3b82f6')
			
			this.counter.percent[el.id] = line2
			svg.append(line2)
			svgWrap.append(svg)
			div.append(svgWrap)
			
			let countWrap = document.createElement('DIV')
			countWrap.setAttribute('id', `value_${el.id}`)
			countWrap.setAttribute('class', 'result__count')
			countWrap.innerText = 0
			this.counter.count[el.id] = countWrap
			div.append(countWrap)
			item.append(div)
			list.append(item)
		})
		box.append(list)
	},
	animate(name, el, time) {
		if (el.counter.time == null) {
			el.counter.time = time
		}
		
		const run = time - el.counter.time
		const value = name == 'count' 
			? el.count 
			: this.getPercent(el.count)
		
		el.counter.value = value > 0
			? Math.ceil(value * Math.min(run / 500, 1))
			: 0
		
		name == 'count'
			? this.counter.count[el.id].innerText = el.counter.value
			: this.counter.percent[el.id].setAttributeNS(null, 'x2', `${el.counter.value}%`)
	
		if (run < 500) {
			requestAnimationFrame(this.animate.bind(this, name, el))
		}
	},
	getPercent(count) {
		return this.total
			? 100 - Math.ceil(((this.total - count) * 100) / this.total)
			: 0
	},
	setTotal() {
		this.total = this.data.options.reduce((sum, el) => sum + el.count, 0)
	},
	startAnimate() {
		this.data.options.forEach(el => {
			requestAnimationFrame(this.animate.bind(this, 'count', el))
			requestAnimationFrame(this.animate.bind(this, 'percent', el))
		})
	},
	setCookie(name, value, expDays) {
		let date = new Date()
		date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000))
		const expires = "expires=" + date.toUTCString()
		document.cookie = name + "=" + value + "; " + expires + "; path=/"
	},
	getCookie(name) {
		var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"))
		return matches ? decodeURIComponent(matches[1]) : undefined
	},
	selectOption(e, id) {
		e.preventDefault()
		const cookie = this.getCookie(id)
		if (cookie == undefined) {
			console.log('cookie is missing')
		} else {
			const optionId = document.querySelector('input[name="poll_options"]:checked')?.value
			if (optionId) {
				fetch(`${this.apiURL}/poll`, {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						data: {
							poll_id: id,
							option_id: optionId,
						},
						meta: {
							cookie: cookie
						}
					})
				})
					.then(res => res.json())
					.then(json => {
						if (json.data && json.meta?.cookie) {
							this.setCookie(id, json.meta.cookie, 30)
							this.setCookie('poll_used', 'yes', 30)
							this.data = json.data
							this.setTotal()
							this.addResultHTML()
							this.startAnimate()
						} else {
							console.error('ooops')
						}
					})
					.catch(error => {
						console.error(error)
					})
			} else {
				console.log('option is missing')
			}
		}
	}
}; 