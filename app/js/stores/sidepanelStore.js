import { observable } from 'mobx';
import { getSettingsProp } from '../utils/settings';

export const SidepanelTabs = {
	CHAT:		1,
	USER_LIST:	2,
	MODULES:	3,
	SETTINGS:	4
};

class SidepanelStore {
	@observable currentTab = SidepanelTabs.CHAT;
	@observable sidepanelWidth = getSettingsProp('appearance.sidepanelWidth');
}

export default new SidepanelStore();
