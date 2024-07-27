import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spacer } from "./Spacer";

type TextWithIconProps = {
	icon: IconProp;
	children: React.ReactNode;
};

export const TextWithIcon = ({ icon, children }: TextWithIconProps) => {
	return (
		<div className="flex items-center">
			<FontAwesomeIcon icon={icon} />
			<Spacer className="w-2" />
			{children}
		</div>
	);
};
