import { useState, useEffect} from 'react';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';

function App() {
	const [tasks, setTasks] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [theme, setTheme] = useState('white');

	useEffect(() => {
		console.log('Effect');
	}, [])

	console.log('not effect');

	const handleAddToFavorite = (event, taskIndex, listType) => {
		if (listType === 'task-list' && event.target.checked) {
			const filteredArr = tasks.filter((item, index) => {
				if (index === taskIndex) {
					setFavorites([...favorites, item]);
				} else {
					return item;
				}
			});
			setTasks(filteredArr);
			event.target.checked = false;
		}

		if (listType === 'fav-list' && event.target.checked) {
			const filteredArr = favorites.filter((item, index) => {
				if (index === taskIndex) {
					setTasks([...tasks, item]);
				} else {
					return item;
				}
			});
			setFavorites(filteredArr);
			event.target.checked = false;
		}
	};

	const handleChangeInput = (event) => {
		setInputValue(event.target.value);
	};

	const handleAddTask = () => {
		if (inputValue !== '') {
			const allTasks = [...tasks, ...favorites];

			const isNotDuplicate = allTasks.every((task) => task !== inputValue);

			if (isNotDuplicate) setTasks([...tasks, inputValue]);
			else toast('Такая задача уже существует', {icon:'📃'})
		} else{
			toast('Write the text', { icon: '😈'});
		}
		
	};
	const toggleTheme = () => {
		if (theme==='white') {
			document.documentElement.style.setProperty(`--background`, `#282828`);
			document.documentElement.style.setProperty('--text-color', '#fafafa');
			document.documentElement.style.setProperty('--accent-color', '#a3a3a3');
			setTheme('black')
		}
		else{
			document.documentElement.style.setProperty('--background', '#fafafa');
			document.documentElement.style.setProperty('--text-color', '#282828');
			document.documentElement.style.setProperty('--accent-color', '#5c5c5c');	
			setTheme('white')
		}
	}

	return (
		<div className='big-wrapper'>
				<Toaster/>
				<button onClick={toggleTheme} className='toggle'>Toggle Theme</button>
				<div className='todo-wrapper'>
					<div className='todo-actions'>
						<input 
							className='todo-input' 
							type='text' 
							value={inputValue} 
							onChange={handleChangeInput} 
							/>
							<button className='todo-btn' onClick={handleAddTask}>Add</button>
					</div>
				<ol className='todo-list'>
					{favorites.map(function (favTask, index) {
						return (
							<li key={index} className='items fav-item' >
								{favTask}
								<input
									type='checkbox'
									onChange={(event) =>
										handleAddToFavorite(event, index, 'fav-list')
									}
									/>
							</li>
						);
					})}
					{tasks.map(function (task, index) {
						return (
							<li key={index} className='items list-item'>
								{task}
								<input
									type='checkbox'
									onChange={(event) =>
										handleAddToFavorite(event, index, 'task-list')
									}
									/>
							</li>
						);
					})}
				</ol>
			</div>
		</div>
	);

	
}

export default App;
