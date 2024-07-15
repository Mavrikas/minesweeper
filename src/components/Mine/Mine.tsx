import './Mine.css';

export default function Mine() {
	return (
		<svg
			width="30px"
			height="30px"
			viewBox="0 0 48 48"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				className="a"
				d="M15.24,22.65a2.2,2.2,0,1,1,2.19-2.19A2.19,2.19,0,0,1,15.24,22.65ZM21,18.89a3,3,0,1,1,3-3A3,3,0,0,1,21,18.89Z"
			/>
			<circle className="b" cx="24.01" cy="24" r="15.73" />
			<line className="b" x1="24" y1="2.5" x2="24" y2="8.27" />
			<line className="b" x1="45.51" y1="23.98" x2="39.75" y2="23.98" />
			<line className="b" x1="24.03" y1="45.5" x2="24.03" y2="39.73" />
			<line className="b" x1="2.51" y1="24.02" x2="8.28" y2="24.02" />
			<line className="b" x1="35.14" y1="12.88" x2="37.18" y2="10.84" />
			<line className="b" x1="35.14" y1="35.12" x2="37.18" y2="37.16" />
			<line className="b" x1="12.89" y1="35.12" x2="10.85" y2="37.16" />
			<line className="b" x1="12.89" y1="12.88" x2="10.85" y2="10.84" />
		</svg>
	);
}
