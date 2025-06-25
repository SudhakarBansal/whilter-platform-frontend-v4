import merge from 'lodash/merge';

// project import
import Autocomplete from './Autocomplete';
import Badge from './Badge';
import Button from './Button';
import Card from './Card';
import CardContent from './CardContent';
import Checkbox from './Checkbox';
import Chip from './Chip';
// import InputLabel from './InputLabel';
import Input from './Input';
import LinearProgress from './LinearProgress';
import Link from './Link';
import Lists from './Lists';
import Paper from './Paper';
import Tab from './Tab';
import Table from './Table';
import Tabs from './Tabs';
import Typography from './Typography';
import Slider from './Slider';
import Divider from './Divider';
import Avatar from './Avatar';
import Switch from './Switch';
import Radio from './Radio';
import HelperText from './HelperText';

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function ComponentsOverrides(theme: any, themeOption: any) {
  return merge(
    Autocomplete(theme),
    Avatar(theme),
    Button(theme),
    Badge(theme),
    Card(theme),
    CardContent(theme),
    Checkbox(theme),
    Chip(theme),
    Divider(theme),
    Input(theme),
    // InputLabel(theme),
    LinearProgress(theme),
    Link(),
    Switch(theme),
    Lists(theme, themeOption),
    Paper(theme),
    Radio(theme),
    Slider(theme),
    Tab(theme),
    Table(theme),
    Tabs(),
    Typography(theme),
    HelperText(theme)
  );
}
