import { Editor } from 'tinymce/core/api/Editor';

export interface Settings {
  table_toolbar?: string;

  table_appearance_options?: boolean;

  table_clone_elements?: string;

  table_grid?: boolean;

  table_tab_navigation?: boolean;

  table_default_attributes?: Object | string;

  table_default_styles?: Object | string;

  table_class_list?: Object[];

  table_cell_class_list?: Object[];

  table_row_class_list?: Object[];

  table_advtab?: boolean;

  table_cell_advtab?: boolean;

  table_row_advtab?: boolean;

  auto_focus?: string;

  cache_suffix?: string;

  content_security_policy?: string;

  external_plugins?: {};

  hidden_input?: boolean;

  paste_data_images?: boolean;

  advlist_number_styles?: string;

  init_instance_callback?(editor: Editor): void;

  plugins?: string | string[];

  selector?: string;

  setup?(edtor: Editor): void;

  target?: Element;

  branding?: boolean;

  color_picker_callback?(callback: (hexColor: string) => void, value: string): void;

  custom_ui_selector?: string;

  elementpath?: boolean;

  event_root?: boolean;

  fixed_toolbar_container?: string;

  height?: number | string;

  inline?: boolean;

  insert_button_items?: string;

  insert_toolbar?: string;

  max_height?: number;

  max_width?: number;

  menu?: settings.Menu;

  menubar?: string | boolean;

  min_height?: number | string;

  min_width?: number | string;

  preview_styles?: boolean | string;

  removed_menuitems?: string;

  resize?: boolean | string;

  selection_toolbar?: string;

  skin_url?: string;

  skin?: string;

  statusbar?: boolean;

  theme_url?: string;

  theme?: string;

  toolbar?: boolean | string | string[];

  width?: number | string;

  body_class?: string;

  body_id?: string;

  content_css?: string | string[];

  content_style?: string;

  inline_boundaries?: boolean;

  visual_anchor_class?: string;

  visual_table_class?: string;

  visual?: boolean;

  allow_conditional_comments?: boolean;

  allow_html_in_named_anchor?: boolean;

  allow_unsafe_link_target?: boolean;

  convert_fonts_to_spans?: boolean;

  custom_elements?: string;

  doctype?: string;

  element_format?: string;

  encoding?: string;

  entities?: string;

  entity_encoding?: string;

  extended_valid_elements?: string;

  fix_list_elements?: boolean;

  force_hex_style_colors?: boolean;

  forced_root_block?: string;

  forced_root_block_attrs?: {};

  invalid_elements?: string;

  invalid_styles?: string | {};

  keep_styles?: boolean;

  protect?: RegExp[];

  remove_trailing_brs?: boolean;

  schema?: string;

  valid_children?: string;

  valid_classes?: string | {};

  valid_elements?: string;

  valid_styles?: {};

  block_formats?: string;

  font_formats?: string;

  fontsize_formats?: string;

  formats?: {};

  removeFormat?: Array<{}>;

  indentation?: string;

  style_formats?: Array<{}>;

  style_formats_autohide?: boolean;

  style_formats_merge?: boolean;

  browser_spellcheck?: boolean;

  gecko_spellcheck?: boolean;

  automatic_uploads?: boolean;

  file_browser_callback?(field_name: string, url: string, type: string, win: Window): void;

  file_browser_callback_types?: string;

  file_picker_callback?(callback: (filename: string, metadata: {}) => void, valud: string, meta: {}): void;

  file_picker_types?: string;

  images_dataimg_filter?(img: any): void;

  images_reuse_filename?: boolean;

  images_upload_base_path?: string;

  images_upload_credentials?: boolean;

  images_upload_handler?(blobInfo: any, success: (msg: string) => void, failure: (msg: string) => void): void;

  images_upload_url?: string;

  directionality?: string;

  language?: string;

  language_url?: string;

  allow_script_urls?: boolean;

  convert_urls?: boolean;

  document_base_url?: string;

  relative_urls?: boolean;

  remove_script_host?: boolean;

  urlconverter_callback?(url: string, node: HTMLElement, on_save: boolean, name: string): void;

  anchor_bottom?: string;

  anchor_top?: string;

  br_in_pre?: boolean;

  custom_undo_redo_levels?: number;

  end_container_on_empty_block?: boolean;

  nowrap?: boolean;

  object_resizing?: boolean | string;

  type_ahead_urls?: boolean;

  autosave_ask_before_unload?: boolean;

  autosave_interval?: string;

  autosave_prefix?: string;

  autosave_restore_when_empty?: boolean;

  autosave_retention?: string;

  imagetools_cors_hosts?: string[];

  imagetools_proxy?: string;

  imagetools_toolbar?: string;

  imagetools_api_key?: string;
}

export namespace settings {
  interface Menu {
    file: MenuItem;
    edit: MenuItem;
    insert: MenuItem;
    view: MenuItem;
    format: MenuItem;
    table: MenuItem;
    tools: MenuItem;
  }

  interface MenuItem {
    title: string;
    items: string;
  }
}
