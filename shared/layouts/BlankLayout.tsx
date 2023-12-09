import React, { useState } from 'react';
import styles from './style.module.scss'

function BlankLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.wrapBlankLayout }>
            <div className={styles.blankLayout}>
                {children}
            </div>
            <img className={styles.logoBlankLayout} alt="logo" src="/logo.png" />
        </div>
    );
};

export default BlankLayout;