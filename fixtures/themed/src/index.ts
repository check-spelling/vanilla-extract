import {
  createInlineTheme,
  setElementTheme,
  setElementVar,
} from '@vanilla-extract/dynamic';

import { theme, altTheme, responsiveTheme, vars } from './themes.css';
import { button, container, opacity } from './styles.css';
import { shadow } from './shared.css';
import testNodes from '../test-nodes.json';

const inlineTheme = createInlineTheme(vars, {
  colors: {
    backgroundColor: 'orange',
    text: 'black',
  },
  space: {
    1: '4px',
    2: '8px',
    3: '12px',
  },
});

function render() {
  document.body.innerHTML = `
  <div id="${testNodes.root}" class="${shadow}"> 
    Root theme
    <div id="${testNodes.rootContainer}" class="${container}">
      <button id="${testNodes.rootButton}" class="${button.join(
    ' ',
  )}">Main theme button</button>
      <div class="${altTheme}"> 
        Alt theme
        <div id="${testNodes.altContainer}" class="${container}">
          <button id="${testNodes.altButton}" class="${button.join(
    ' ',
  )}">Alt theme button</button>
          <div class="${theme}"> 
            Back to root theme
            <div id="${testNodes.nestedRootContainer}" class="${container}">
              <button id="${testNodes.nestedRootButton}" class="${button.join(
    ' ',
  )}">Main theme button</button>
            <div style="${inlineTheme}">
              Inline theme
                <div id="${
                  testNodes.inlineThemeContainer
                }" class="${container}">
                  <button id="${
                    testNodes.inlineThemeButton
                  }" class="${button.join(' ')} ${
    opacity['1/2']
  }">Inline theme button</button>
                  <div>
                  Dynamic vars
                    <div id="${
                      testNodes.dynamicVarsContainer
                    }" class="${container}">
                      <button id="${
                        testNodes.dynamicVarsButton
                      }" class="${button.join(
    ' ',
  )}">Dynamic vars button</button>
                  <div class="${responsiveTheme}">
              Responsive theme
                <div id="${
                  testNodes.responsiveThemeContainer
                }" class="${container}">
                  <button id="${
                    testNodes.responsiveThemeButton
                  }" class="${button.join(
    ' ',
  )}">Responsive theme button</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

  const dynamicVarsContainer = document.getElementById(
    testNodes.dynamicVarsContainer,
  );

  if (!dynamicVarsContainer) {
    throw new Error('Dynamic vars container not found.');
  }

  setElementTheme(dynamicVarsContainer, vars, {
    colors: {
      backgroundColor: 'transparent',
      text: 'papayawhip',
    },
    space: {
      1: '5px',
      2: '10px',
      3: '15px',
    },
  });

  setElementVar(
    dynamicVarsContainer,
    vars.colors.backgroundColor,
    'darksalmon',
  );
}

render();
