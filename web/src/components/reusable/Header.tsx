import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";
import { Spacer } from "./Spacer";

type HeaderProps = {
	title: string;
	icon?: IconProp;
	children?: ReactNode;
};

export const Header = ({ title, children, icon }: HeaderProps) => {
	return (
		<div className="flex bg-fuchsia-800 text-white border-b-4 border-black">
			<Link to="/">
				<h1 className="p-2 text-2xl flex items-center">
					{icon && <FontAwesomeIcon icon={icon} />}
					<Spacer className={"w-2"} />
					<span>{title}</span>
				</h1>
			</Link>
			<div>{children}</div>
		</div>
	);
};
