import { observable } from 'mobx';

export const SidepanelTabs = {
    CHAT:       1,
    USER_LIST:  2,
    MODULES:    3,
    SETTINGS:   4
};

class SidepanelStore {
	@observable currentTab = SidepanelTabs.CHAT;
}

export default new SidepanelStore();
